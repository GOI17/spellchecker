import json
from spell_checker import spell_check_sentence


def spell_check(event, context):
    input_sentence = json.loads(event.get("body")).get("text")
    correct_sentence = spell_check_sentence(input_sentence)

    body = {
        "text": correct_sentence
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
