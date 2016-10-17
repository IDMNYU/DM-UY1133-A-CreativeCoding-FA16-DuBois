int value = 0; // this stores the value of the sensor (0-1023)

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); // talks back to computer
}

void loop() {
  // put your main code here, to run repeatedly:
  value = analogRead(A0); // read the analog pin
  Serial.println(value); // send the value over serial
  delay(10); // hang on a sec
}
