from atproto import Client
import os

class BlueskyBot:

    @staticmethod
    def real(mensagem:str, url:str):
        message = (
            f"O link: \n{url} \nfoi verificado e é tratado como REAL "
            f"pelas métricas do Modelo.\n\n"
            f"""{mensagem}"""
            f"Não trate esse POST como VERDADE absoluta"
        )
        return message

    @staticmethod
    def fake(mensagem:str, url:str):
        message = (
            f"O link: \n{url} \nfoi verificado e é tratado como FALSO "
            f"pelas métricas do Modelo.\n\n"
            f"""{mensagem}"""
            f"Não trate esse POST como MENTIRA absoluta"
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