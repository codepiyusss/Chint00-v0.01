from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import traceback

app = Flask(__name__)
CORS(app)

# ✅ 1. Configure your Gemini API key
genai.configure(api_key="AIzaSyBdE5KiNQEowYAWDC-E0CkoPirXCk7zDQA")

# ✅ 2. Initialize the Gemini model
model = genai.GenerativeModel('gemini-pro')

# ✅ 3. Create the /ask endpoint
@app.route('/ask', methods=['POST'])
def ask():
    try:
        data = request.get_json()
        question = data.get("question", "").strip()

        print(f"📩 Incoming question: {question}")

        if not question:
            return jsonify({"answer": "❌ No question provided"}), 400

        response = model.generate_content(question)
        print(f"🤖 Gemini says: {response.text}")

        return jsonify({"answer": response.text})

    except Exception as e:
        print("🔥 Gemini Backend Error:")
        traceback.print_exc()
        return jsonify({"answer": f"❌ Error: {str(e)}"}), 500

# ✅ 4. Start Flask server
if __name__ == '__main__':
    app.run(debug=True)
