//YouTube|Tech at Home

#include "DHT.h"
#include <LiquidCrystal_I2C.h>
#include <Wire.h> 


LiquidCrystal_I2C lcd(0x27,16,2); 

#define DHTPIN 2     
#define DHTTYPE DHT11   // DHT 11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  lcd.begin();                     
  lcd.backlight();
  lcd.setBacklight(HIGH);
}

void loop() {
  
  int h = dht.readHumidity();

  int t = dht.readTemperature();

  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  lcd.setCursor(0,0);
  lcd.print("Humidity:");
  lcd.print(h);
  lcd.print("%");
  

  lcd.setCursor(0,1);
  lcd.print("Temperature:");
  lcd.print(t);
  lcd.print("C");
  delay(50);

}
