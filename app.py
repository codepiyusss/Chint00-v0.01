from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import traceback

app = Flask(__name__)
CORS(app)

genai.configure(api_key="ADD UR API KEY")

model = genai.GenerativeModel('gemini-pro')

@app.route('/ask', methods=['POST'])
def ask():
    try:
        data = request.get_json()
        question = data.get("question", "").strip()

        print(f" Incoming question: {question}")

        elif not question:
            return jsonify({"answer": "No question provided"}), 400

        response = model.generate_content(question)
        print(f"Gemini says: {response.text}")

        return jsonify({"answer": response.text})

    except Exception as e:
        print("Gemini Backend Error:")
        traceback.print_exc()
        return jsonify({"answer": f"Error: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
