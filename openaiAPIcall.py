from openai import OpenAI
  
client = OpenAI(
    base_url="https://api.novita.ai/v3/openai",
    # Get the Novita AI API Key by referring: /docs/get-started/quickstart.htmll#_3-create-an-api-key
    api_key="7bfafb91-af9d-4d86-91b2-fa6072b98f1f",
)

model = "qwen/qwen-2.5-72b-instruct"
stream = True # or False
max_tokens = 16000

chat_completion_res = client.chat.completions.create(
    model=model,
    messages=[
        {
            "role": "system",
            "content": "Act like you are a helpful assistant.",
        },
        {
            "role": "user",
            "content": "Hi there!",
        }
    ],
    stream=stream,
    max_tokens=max_tokens,
  )

if stream:
    for chunk in chat_completion_res:
        print(chunk.choices[0].delta.content or "", end="")
else:
    print(chat_completion_res.choices[0].message.content)