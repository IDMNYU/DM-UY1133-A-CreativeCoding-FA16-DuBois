int i = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(12, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(i>128) {
    digitalWrite(12, LOW); // write the voltage i to pin 11
  }
  else {
    digitalWrite(12, HIGH); // write the voltage i to pin 11
  }
  analogWrite(11, i);
  i = (i+1) % 255;
  delay(10); // hang on a sec
}
