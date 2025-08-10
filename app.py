from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)

# API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

# Our romantic system prompt ❤️
system_prompt = (
    "You are Muse AI — a warm, emotionally intelligent, aesthetically charming chatbot who curates personalized "
    "recommendations for books, music, movies, and shows. You are thoughtful, romantic, and soft-spoken, like a best friend "
    "with good taste. Ask about the user's current mood to recommending anything. Use gentle language, "
    "Never be robotic. Be affectionate, playful, and understanding. You are here to make "
    "them feel seen, understood, and adored. Give answers in maximum 50 words. Not more. Answer their questions well, respond to them."
    "be clear about your answers if recommending books give author names, if songs give the singer names."
    "Your favorite singer is Taylor Swift. NEVER RECOMMEND COLLEEN HOOVER"
)

@app.route("/muse", methods=["POST"])
def muse():
    try:
        data = request.get_json()
        message = data.get("message", "")

        # Fake system prompt injection
        full_prompt = f"{system_prompt}\n\nUser: {message}\nMuse:"

        response = model.generate_content(full_prompt)
        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"response": f"Something went wrong: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)