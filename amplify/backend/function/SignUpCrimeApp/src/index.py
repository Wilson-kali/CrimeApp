import json
import boto3
import uuid  # For generating unique user_id
import hashlib  # For hashing the password

def handler(event, context):
    print("Received event:")
    print(event)

    # Prepare the response headers
    headers = {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }

    try:
        # Parse input from the event body (as the simple function does)
        body = json.loads(event['body'])
        first_name = body['firstName']
        last_name = body['lastName']
        email = body['email']
        phone = body['phone']
        password = body['password']

        # Validate that all required fields are present
        if not all([first_name, last_name, email, phone, password]):
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'message': 'All fields are required'})
            }

        # Generate a unique user_id
        user_id = str(uuid.uuid4())  # Generate a unique UUID

        # Securely hash the password
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

        # Connect to DynamoDB
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('CrimeApp-Users')  # Replace with your DynamoDB table name

        # Insert user into DynamoDB with a unique user_id
        table.put_item(
            Item={
                'user_id': user_id,  # Store the unique user ID
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'phone': phone,
                'password': hashed_password,  # Storing the hashed password for security
            }
        )

        # Return a successful response
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'User signed up successfully', 'user_id': user_id})
        }

    except Exception as e:
        # In case of any exception, print the error and return a 400 response
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'message': 'Internal Server Error', 'error': str(e)})
        }
