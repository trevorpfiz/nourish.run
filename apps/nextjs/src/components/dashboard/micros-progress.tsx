import { Card, Flex, ProgressBar, Text } from "@tremor/react";

const MicrosProgress = () => (
  <Card className="mx-auto max-w-sm">
    <Flex>
      <Text>$ 9,012 &bull; 45%</Text>
      <Text>$ 20,000</Text>
    </Flex>
    <ProgressBar value={45} color="teal" className="mt-3" />
  </Card>
);

export { MicrosProgress };
