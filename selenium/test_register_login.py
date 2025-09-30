"""Selenium end-to-end test: register and login."""
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time


def main():
    driver = webdriver.Chrome()
    driver.get("http://localhost:4200/register")

    username = f"user{int(time.time())}"
    driver.find_element(By.CSS_SELECTOR, "input[name='username']").send_keys(username)
    driver.find_element(By.CSS_SELECTOR, "input[name='password']").send_keys("password123")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    time.sleep(1)
    driver.get("http://localhost:4200/login")
    driver.find_element(By.CSS_SELECTOR, "input[name='username']").send_keys(username)
    driver.find_element(By.CSS_SELECTOR, "input[name='password']").send_keys("password123")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    time.sleep(3)
    assert "products" in driver.current_url.lower()
    driver.quit()


if __name__ == "__main__":
    main()
