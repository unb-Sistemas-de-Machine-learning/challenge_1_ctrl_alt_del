const API_BASE_URL = 'http://localhost:8000/api';

export interface Source {
  title: string;
  url: string;
}

export interface AnalysisResultResponse {
  verdict: 'real' | 'fake' | 'Não trata-se de uma proposta de governo';
  responseText: string;
}

export interface InstagramPostResponse  {
  imageUrl: string;
  extractedText: string;
  caption: string;
  shortcode: string
}

export interface InstagramPostSubmissionRequest {
  url: string;
}

export interface BlueSkyResponse {
  verdict: 'real' | 'fake' | 'Não trata-se de uma proposta de governo';
  responseText: string;
  url: string;
}

export const analyzeScrapy = async (
  request: InstagramPostSubmissionRequest
): Promise<InstagramPostResponse > => {
  try {
    const response = await fetch(`${API_BASE_URL}/scrapy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      if (response.status === 422) {
        throw new Error(
          'Link inválido. Apenas links de posts do feed (contendo /p/) são aceitos.'
        );
      }

      throw new Error(`Erro do servidor: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error(
        'Erro de conexão. Verifique se o servidor está rodando.'
      );
    }

    throw error;
  }
};

export const analyzePost = async (
  request: InstagramPostResponse
): Promise<AnalysisResultResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/modelo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      if (response.status === 422) {
        throw new Error(
          'O correu um erro ao analisar o post.'
        );
      }

      throw new Error(`Erro do servidor: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error(
        'Erro de conexão. Verifique se o servidor está rodando.'
      );
    }

    throw error;
  }
};


export const blueskypost = async (
  request: BlueSkyResponse
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bluesky`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    return await response.json();
  } catch (error: any) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error(
        'Erro de conexão. Verifique se o servidor está rodando.'
      );
    }

    throw error;
  }
};
