//Librarires
#include <DHT.h> //DHT Sensor
#include <LiquidCrystal.h> //LCD
#include <TinyGPS++.h>  //GPS
#include <SoftwareSerial.h> //Serial Communication


//Global Varibales
static const int RXPin=7,TXPin=6;
static const uint32_t GPSBaud=9600;
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2, ct=9;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
#define DHTPIN 8     
#define DHTTYPE DHT11   // DHT 11


// Objects
TinyGPSPlus gps;
SoftwareSerial GPS(RXPin,TXPin); 
DHT dht(DHTPIN, DHTTYPE);


void setup() {
  delay(200);
  Serial.begin(9600);  //Start Serial Communication
  delay(1000);
  dht.begin();  //Initialize sensor data
  lcd.begin(16,2);    //Initiazlize LCD
  GPS.begin(GPSBaud); //Intialize GPS
}


void loop() {
  //Displays Latitude and Longitude 
  if (GPS.available() > 0){
  gps.encode(GPS.read());
    if (gps.location.isUpdated()){
      Serial.print("Latitude= "); 
      lcd.setCursor(0,0);
      lcd.print("Lat=  ");
      Serial.print(gps.location.lat(), 6);
      lcd.println(gps.location.lat(), 6);
      Serial.print(" Longitude= "); 
      lcd.setCursor(0,1);
      lcd.print("Long= ");
      Serial.println(gps.location.lng(), 6);
      lcd.print(gps.location.lng(), 6);
      delay(2000);

      // Displays Sensor data
      float h = dht.readHumidity();
      float t = dht.readTemperature();
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
      delay(1000);  
      Serial.print('\n');
      Serial.print("Humidity = ");
      Serial.print(h);
      Serial.print("%,  ");
      Serial.print("Temperature = ");
      Serial.print(t);
      Serial.println("°C, "); 
      Serial.print("\n");  
    }
  }
}
