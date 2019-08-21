import 'source-map-support/register';
import * as nconf from 'nconf';
import { Stack, StackProps, App, RemovalPolicy } from '@aws-cdk/core'
import * as s3 from '@aws-cdk/aws-s3';
import * as ec2 from '@aws-cdk/aws-ec2';

nconf.env().argv().defaults({
  REGION: 'us-east-1',
  ACCOUNT: 'ACCOUNT',
})

export class MongoDBStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {

    super(scope, id, props);

    // create vpc
    const vpc = new ec2.Vpc(this, 'VPC', { maxAzs: 1 });

    // create S3 bucket
    const myBucket = new s3.Bucket(this, 'MyFirstBucket', {
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY,
    })

  }
}

// create stack from an app
const app = new App();
new MongoDBStack(app, 'MongoDBStack', {
  env: { region: nconf.get('REGION'), account: nconf.get('ACCOUNT'), }
});
app.synth();
