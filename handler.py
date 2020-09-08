import json
from spell_checker import spell_check_sentence
from db_config import create_connection, insert_into_table, get_data

# Uncomment only if the db not exists
# create_connection()


def spell_check(event, context):
    request_body = event.get("body")
    request_host = "".join((event.get("headers").get("Host"), event.get("resource")))
    request_method = event.get("httpMethod")
    input_sentence = json.loads(request_body).get("text")
    correct_sentence = spell_check_sentence(input_sentence)
    body = {
        "text": correct_sentence,
    }
    response = {"statusCode": 200, "body": json.dumps(body)}
    insert_into_table(request_host, request_method, input_sentence)

    return response


def history(event, context):
    history = get_data()
    body = {
        "results": history,
    }
    response = {
        "statusCode": 200,
        "body": json.dumps(body),
    }

    return response
