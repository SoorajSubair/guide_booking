# from django.contrib.auth import get_user_model
# from asgiref.sync import async_to_sync
# from channels.generic.websocket import WebsocketConsumer
# import json
# from ..API.models import Message, Chat, Contact
# # from .views import get_last_10_messages, get_user_contact, get_current_chat

# User = get_user_model()

# class ChatConsumer(WebsocketConsumer):

#     def fetch_messages(self, data):
#         chatId = data['chatId']
#         chat = Chat.objects.get(id=chatId)
#         messages = chat.messages.all()
#         content = {
#             'command': 'messages',
#             'messages': self.messages_to_json(messages)
#         }
#         self.send_message(content)

#     def new_message(self, data):
#         username = data['from']
#         user = User.objects.get(username = username)
#         user_contact = Contact.objects.get(user = user)
#         message = Message.objects.create(
#             contact=user_contact, 
#             content=data['message'])
#         chatId = data['chatId']
#         current_chat = Chat.objects.get(id=chatId)
#         current_chat.messages.add(message)
#         current_chat.save()
#         content = {
#             'command': 'new_message',
#             'message': self.message_to_json(message)
#         }
#         return self.send_chat_message(content)

#     def messages_to_json(self, messages):
#         result = []
#         for message in messages:
#             result.append(self.message_to_json(message))
#         return result

#     def message_to_json(self, message):
#         return {
#             'id': message.id,
#             'author': message.contact.user.username,
#             'content': message.content,
#             'timestamp': str(message.timestamp)
#         }

#     commands = {
#         'fetch_messages': fetch_messages,
#         'new_message': new_message
#     }

#     def connect(self):
#         self.room_name = self.scope['url_route']['kwargs']['room_name']
#         self.room_group_name = 'chat_%s' % self.room_name
#         async_to_sync(self.channel_layer.group_add)(
#             self.room_group_name,
#             self.channel_name
#         )
#         self.accept()

#     def disconnect(self, close_code):
#         async_to_sync(self.channel_layer.group_discard)(
#             self.room_group_name,
#             self.channel_name
#         )

#     def receive(self, text_data):
#         data = json.loads(text_data)
#         self.commands[data['command']](self, data)
        

#     def send_chat_message(self, message):    
#         async_to_sync(self.channel_layer.group_send)(
#             self.room_group_name,
#             {
#                 'type': 'chat_message',
#                 'message': message
#             }
#         )

#     def send_message(self, message):
#         self.send(text_data=json.dumps(message))

#     def chat_message(self, event):
#         message = event['message']
#         self.send(text_data=json.dumps(message))


import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Chat,Message,CustomUser


class ChatConsumer(WebsocketConsumer):

    def fetch_messages(self, data):
        chat = Chat.objects.get(id = data['chatId'])
        messages = Message.objects.filter(chat = chat)
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)
    
    def new_message(self, data):
        sender = CustomUser.objects.get(id = data['from'])
        chat = Chat.objects.get(id = data['chatId'])
        message = Message.objects.create(
            chat = chat,
            sender = sender,
            content=data['message'])
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_chat_message(content)


    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result
    
    def message_to_json(self, message):
        return {
            'id': message.id,
            'sender': message.sender.first_name,
            'senderId':message.sender.id,
            'content': message.content,
            'created_at': str(message.created_at)
        }

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({"message": message}))