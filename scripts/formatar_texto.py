
def formatar_texto(text_colect):
    text = ' '.join(text_colect.split())
    text = text.replace('\"', ' ')
    text = text.replace('\n', ' ')
    text = text.replace('\t', ' ')
    
    return text