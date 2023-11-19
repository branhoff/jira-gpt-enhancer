from flask import Flask
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
from app.routes import jira_routes, chat_gpt_routes

app.register_blueprint(jira_routes.jira_bp)
app.register_blueprint(chat_gpt_routes.chatgpt_bp)

