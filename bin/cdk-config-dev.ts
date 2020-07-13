
// Structure for tagging objects created
interface Tag {
    name: string;
    value: string;
}

export const stackTags: { name: string, value: string }[] = [
    { name: 'AppName', value: 'test-fargate-ecs-app' },
    { name: 'CostCenter', value: '1000' },
    { name: 'StackName', value: 'CDK-FARGATE-ECS-APP' },
    { name: 'StackOwner', value: 'John Macis' },
    { name: 'Env', value: 'Development' }
];