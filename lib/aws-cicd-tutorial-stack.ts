import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as fs from 'fs'; // Import fs
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// npm run build

export class AwsCicdTutorialStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const lambdaFunction = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_18_X, // Use the latest Node.js runtime
      code: lambda.Code.fromAsset('lambda'), // Path to the Lambda function code
      handler: 'main.handler', // The file and exported function name
      environment: {
        VERSION: fs.readFileSync('VERSION').toString().trim(), // Read version from VERSION file
      }
    });

    const functionUrl = lambdaFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'], // Allow all origins
        allowedMethods: [lambda.HttpMethod.GET, lambda.HttpMethod.POST], // Allow GET and POST methods allowedHeaders: ['*'], // Allow all headers

      }
    });

    new cdk.CfnOutput(this, 'FunctionUrl', {
      value: functionUrl.url,
    });
  }
}
