#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkFargateEcsStack } from '../lib/cdk-fargate-ecs-stack';
import { Tag } from '@aws-cdk/core';

const app = new cdk.App();
const stack = new CdkFargateEcsStack(app, 'CdkFargateEcsStack', {
    env: {
        account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION
    }
});

// apply tags to stack
Tag.add(stack, 'StackOwner', 'John Macis');
Tag.add(stack, 'APP_NAME', 'CDK-FARGATE-ECS-APP');