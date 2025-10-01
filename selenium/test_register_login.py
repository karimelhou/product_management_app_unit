"""
Selenium end-to-end test: register and login (with visible UI).
"""

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


def main():
    # Setup Chrome (NO headless → UI visible)
    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ["enable-logging"])  # Suppress Selenium logs

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()), options=options
    )
    wait = WebDriverWait(driver, 10)

    try:
        # Go to register page
        driver.get("http://localhost:4200/register")

        # Unique username
        username = f"user{int(time.time())}"

        # Fill and submit registration form
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[name='username']"))).send_keys(username)
        driver.find_element(By.CSS_SELECTOR, "input[name='password']").send_keys("password123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        # Go to login page
        driver.get("http://localhost:4200/login")
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[name='username']"))).send_keys(username)
        driver.find_element(By.CSS_SELECTOR, "input[name='password']").send_keys("password123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        # Wait until redirected to /products
        wait.until(EC.url_contains("products"))

        # Assertion: URL contains 'products'
        assert "products" in driver.current_url.lower()
        print("✅ Test passed: user registered and logged in successfully.")

        # Pause so you can see the UI before closing
        time.sleep(5)

    except Exception as e:
        print(f"❌ Test failed: {e}")
        raise

    finally:
        driver.quit()


if __name__ == "__main__":
    main()
