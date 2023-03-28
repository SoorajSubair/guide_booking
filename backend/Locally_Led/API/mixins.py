from django.conf import settings
from twilio.rest import Client
import random

class Messghandler:
    phone = None
    otp = None
    def __init__(self, phone, otp) -> None:
        self.phone = phone
        self.otp = otp

    def send_otp_on_phone(self):
        client = Client(settings.ACCOUNT_SID, settings.ACCOUNT_TOKEN)
        verification = client.verify \
                    .v2 \
                    .services('VA22cc76784e94765c622eae9affd6466b') \
                    .verifications \
                    .create(to=self.phone, channel='sms')

    def validate(self):
        client = Client(settings.ACCOUNT_SID, settings.ACCOUNT_TOKEN)
        verification_check = client.verify \
                            .v2 \
                            .services('VA22cc76784e94765c622eae9affd6466b') \
                            .verification_checks \
                            .create(to=self.phone, code=self.otp)
        validation = verification_check.status
        print(validation)
        return validation