from flask import Flask

app = Flask(__name__)

from app.routes import jira_routes, chat_gpt_routes

app.register_blueprint(jira_routes.jira_bp)
app.register_blueprint(chat_gpt_routes.chatgpt_bp)

