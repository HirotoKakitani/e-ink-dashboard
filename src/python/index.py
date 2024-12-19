from playwright.sync_api import sync_playwright
import epaper
from PIL import Image
import io

def run(playwright):
    # launch the browser
    browser = playwright.chromium.launch()
    # opens a new browser page
    page = browser.new_page()
    # navigate to the website
    page.goto('http://localhost:8080')
    # take a full-page screenshot
    imgData = page.screenshot(clip={'x': 0, 'y':0, 'width':800, 'height':480})
    print("Finished screenshot");
    # always close the browser
    browser.close()
    
    print("starting epd connection")
    epd = epaper.epaper('epd7in5_V2').EPD()
    print("got epd")    
    epd.init()
    print("init")
    
    # image = Image.open('7in5_V2_test_image.jpg')
    image = Image.open(io.BytesIO(imgData))
    print("opened image")
    epd.display(epd.getbuffer(image))
    print("DEBUG HERE")
    epd.Clear()


with sync_playwright() as playwright:
    run(playwright)

