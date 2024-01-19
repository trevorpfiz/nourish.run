import { Card, Flex, ProgressBar, Text } from "@tremor/react";

const MicrosProgress = () => (
  <Card className="mx-auto max-w-sm">
    <Flex>
      <Text>Energy &bull; 410.9 / 1915.0 kcal</Text>
      <Text>21.45%</Text>
    </Flex>
    <ProgressBar value={21.45} color="gray" className="mt-3" />
  </Card>
);

export { MicrosProgress };
