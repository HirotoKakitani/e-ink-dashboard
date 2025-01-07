from playwright.sync_api import sync_playwright
import epaper
from PIL import Image
import io

def run(playwright):
    # launch the browser
    browser = playwright.chromium.launch(headless=False)
    # opens a new browser page
    page = browser.new_page()
    # navigate to the website
    page.goto('http://localhost:3000')
    page.wait_for_timeout(5000)
    epd = epaper.epaper('epd7in5_V2').EPD()
    epd.init()
    
    while (True): 
        # take a screenshot and write to screen
        imgData = page.screenshot(clip={'x': 0, 'y':0, 'width':800, 'height':480})
        image = Image.open(io.BytesIO(imgData))
        epd.display(epd.getbuffer(image))
        time.sleep(20)
    
    epd.Clear()
    browser.close()
    
with sync_playwright() as playwright:
    run(playwright)

