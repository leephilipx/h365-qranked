import boto3, json
from boto3.dynamodb.conditions import Attr
from decimal import Decimal


# Default json cannot serialize decimals, so add a custom class
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)
        return json.JSONEncoder.default(self, obj)

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table('H365App-Users')


def lambda_handler(event, context):

    DEPLOYMENT_STAGE = event.get('stageVariables', {'ENV_VERSION':'DEV'}).get('ENV_VERSION', 'DEV')
    filter_expression = Attr('UserId').gt(10 if DEPLOYMENT_STAGE == 'PROD' else 0) & Attr('CodeCountRedeemedTOT').gt(0)
        
    response = user_table.scan(
        ProjectionExpression='UserAlias, CodeCountRedeemedTOT',
        FilterExpression=filter_expression,
        ConsistentRead=False,
    )
    
    # Sort by CodeCountRedeemedTOT and extract Top 3
    result = response.get('Items', [])
    result = sorted(result, key=lambda x: x['CodeCountRedeemedTOT'], reverse=True)
    result = result[:3]
    
    return {
        "statusCode": 200,
        "body": json.dumps(result, cls=DecimalEncoder),
        "headers": {
            "Content-Type": "application/json",
        },
    }