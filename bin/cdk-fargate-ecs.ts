#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkFargateEcsStack } from '../lib/cdk-fargate-ecs-stack';
import { Tag } from '@aws-cdk/core';
import { stackTags as stackTagsDev } from './cdk-config-dev';
import { stackTags as stackTagsProd } from './cdk-config-prod';

const app = new cdk.App();

const env = app.node.tryGetContext('env');
if (env === undefined) {
    throw new Error('Environment must be given');
}

const stack = new CdkFargateEcsStack(app, 'CdkFargateEcsStack', {
    env: {
        account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION
    },
    description: "CDK Fargate ECS Stack",
    // tags: { 'StackOwner': 'John Macis', 'APP_NAME': 'CDK-FARGATE-ECS-APP' }
});

// apply tags to stack
const stackTags = env === 'dev' ? stackTagsDev : stackTagsProd;
stackTags.forEach(tag => Tag.add(stack, tag.name, tag.value));
// Tag.add(stack, 'StackOwner', 'John Macis');
// Tag.add(stack, 'APP_NAME', 'CDK-FARGATE-ECS-APP');