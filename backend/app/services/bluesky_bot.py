from atproto import Client
import os

class BlueskyBot:

    @staticmethod
    def real(message:str, url:str):
        message = (
            f"O link {url} foi verificado e é tratado como real "
            f"pelas métricas do Modelo.\n\n"
            f"Resposta do Modelo: {message}\n\n"
            f"Por favor, não trate esse POST como verdade absoluta, "
            f"pois o Modelo pode cometer erros.\n\n"
            f"#FakeNews #VerificaçãoDeFatos"
        )
        return message

    @staticmethod
    def fake(message:str, url:str):
        message = (
            f"O link {url} foi verificado e é tratado como falso "
            f"pelas métricas do Modelo.\n\n"
            f"Resposta do Modelo: {message}\n\n"
            f"Por favor, não trate esse POST como mentira absoluta, "
            f"pois o Modelo pode cometer erros.\n\n"
            f"#FakeNews #VerificaçãoDeFatos"
        )
        return message

    @staticmethod
    def send_post(message: str, verdict: str, url: str):
        try:
            client = Client()
            client.login(os.getenv("USUARIO"), os.getenv("PASSWORD"))
            if verdict == "real":
                post = BlueskyBot.real(message, url)
                client.send_post(post)
            elif verdict == "fake":
                post = BlueskyBot.fake(message, url)
                client.send_post(post)
        except Exception as e:
            print(f"Error sending post: {e}")