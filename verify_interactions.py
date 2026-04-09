import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1280, 'height': 800},
            record_video_dir="/home/jules/verification/videos/",
            record_video_size={"width": 1280, "height": 800}
        )
        page = await context.new_page()

        # Load local server
        await page.goto("http://localhost:3000/")

        # Wait for page load
        await page.wait_for_timeout(2000)

        # Test slider next click with force
        print("Testing slider next...")
        await page.click('#slider-next', force=True)
        await page.wait_for_timeout(1000)

        # Scroll down to cards
        print("Scrolling down...")
        await page.evaluate("window.scrollBy(0, 800)")
        await page.wait_for_timeout(1000)

        # Click a card to open modal
        print("Clicking a game card...")
        cards = await page.locator('.group.relative.bg-surface.rounded-2xl.overflow-hidden.cursor-pointer').all()
        if cards:
            await cards[0].click()
            await page.wait_for_timeout(1500)

            # Take screenshot of modal
            await page.screenshot(path="/home/jules/verification/screenshots/modal.png")
            print("Modal screenshot saved.")

            # Close modal via button
            await page.click('#close-modal', force=True)
            await page.wait_for_timeout(1000)

        await context.close()
        await browser.close()
        print("Verification completed.")

if __name__ == "__main__":
    asyncio.run(run())
