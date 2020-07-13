import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';

export class CdkFargateEcsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create vpc resource
    const vpc = new ec2.Vpc(this, "VPC", {
      maxAzs: 2
    });

    // create ecs cluster resource
    const cluster = new ecs.Cluster(this, 'MyAppEcsClister', {
      vpc: vpc
    });

    // create fargate service
    const fargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'MyAppFargateService', {
      cluster: cluster,
      memoryLimitMiB: 1024,
      cpu: 512,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset(__dirname + '/../my-app'),
        containerPort: 5000,
        environment: {
          APP_ENV: 'Development',
          TEST_ENVIRONMENT_VARIABLE1: 'test environment variable 1 value',
          TEST_ENVIRONMENT_VARIABLE2: 'test environment variable 2 value'
        }
      },
      desiredCount: 2,
      publicLoadBalancer: true
    });

    // create autoscaling policy
    const autoscaling = fargateService.service.autoScaleTaskCount({
      maxCapacity: 4
    });

    // scale cpu utilization
    autoscaling.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 75,
      scaleInCooldown: cdk.Duration.seconds(120),
      scaleOutCooldown: cdk.Duration.seconds(120)
    });

    // scale memory utilization
    autoscaling.scaleOnMemoryUtilization('MemoryScaling', {
      targetUtilizationPercent: 60,
      scaleInCooldown: cdk.Duration.seconds(120),
      scaleOutCooldown: cdk.Duration.seconds(120)
    })
  }
}
