import emoji

def format_text(text_colect):
    text = ' '.join(text_colect.split())
    text = text.replace('\"', ' ')
    text = text.replace('\n', ' ')
    text = text.replace('\t', ' ')
    text = emoji.replace_emoji(text, replace='')

    return text