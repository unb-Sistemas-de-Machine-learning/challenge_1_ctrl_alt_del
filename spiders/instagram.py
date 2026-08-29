import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
import format_text

class instagram_scrapy(scrapy.Spider):
    name = "instagram"
    custom_settings = {
        'ROBOTSTXT_OBEY': False
    }

    def __init__(self, url, **kwargs):
        super().__init__(**kwargs)
        self.url = url

    def start_requests(self):
        if self.url: 
            yield scrapy.Request(url=self.url)
        else:
            self.logger.error("Nenhuma URL fornecida")

    def parse(self, response):
        text_colect = response.css("meta[property='og:title']::attr(content)").get()
        photo = response.css("meta[property='og:image']::attr(content)").get()
        user_id = response.css("meta[property='instapp:owner_user_id']::attr(content)").get()
        
        yield {
                'User': user_id,
                'Photo': photo,
                'Url': response.url,
                'Content': format_text.format_text(text_colect)
        }

def instagram_run_spider(url):
    settings = get_project_settings()
    settings.set('FEEDS', {
        'resultados/instagram.json': {
            'format': 'json',
            'encoding': 'utf-8',
            'overwrite': True
        }
    })
    process = CrawlerProcess(settings)
    process.crawl(instagram_scrapy, url=url)
    process.start()

if __name__ == '__main__':
    url = input("Digite a URL do Instagram: ")
    instagram_run_spider(url)