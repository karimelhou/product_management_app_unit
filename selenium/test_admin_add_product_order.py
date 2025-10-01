00000"""Selenium test covering admin adding a product and placing an order."""
from selenium import webdriver
from selenium.webdriver.common.by import By
import time


ADMIN = {"username": "admin", "password": "adminpass"}


def ensure_admin(driver):
    driver.get("http://localhost:4200/register")
    driver.find_element(By.CSS_SELECTOR, "input[name='username']").send_keys(ADMIN["username"])
    driver.find_element(By.CSS_SELECTOR, "input[name='password']").send_keys(ADMIN["password"])
    driver.find_element(By.CSS_SELECTOR, "select[name='role']").send_keys("ADMIN")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(1)


def login(driver, username, password):
    driver.get("http://localhost:4200/login")
    driver.find_element(By.CSS_SELECTOR, "input[name='username']").clear()
    driver.find_element(By.CSS_SELECTOR, "input[name='username']").send_keys(username)
    driver.find_element(By.CSS_SELECTOR, "input[name='password']").clear()
    driver.find_element(By.CSS_SELECTOR, "input[name='password']").send_keys(password)
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(2)


def add_product(driver):
    driver.find_element(By.LINK_TEXT, "Admin").click()
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, "input[name='name']").send_keys("Test Product")
    driver.find_element(By.CSS_SELECTOR, "textarea[name='description']").send_keys("Selenium product")
    driver.find_element(By.CSS_SELECTOR, "input[name='price']").send_keys("199")
    driver.find_element(By.CSS_SELECTOR, "input[name='stockQuantity']").send_keys("10")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(1)


def place_order(driver):
    driver.find_element(By.LINK_TEXT, "Products").click()
    time.sleep(1)
    driver.find_elements(By.CSS_SELECTOR, "button.add-to-cart")[0].click()
    driver.find_element(By.LINK_TEXT, "Cart").click()
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, "button.place-order").click()
    time.sleep(2)


def main():
    driver = webdriver.Chrome()
    ensure_admin(driver)
    login(driver, ADMIN["username"], ADMIN["password"])
    add_product(driver)
    place_order(driver)
    assert "orders" in driver.current_url.lower()
    driver.quit()


if __name__ == "__main__":
    main()
