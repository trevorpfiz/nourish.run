"use client";

import { Card, Flex, ProgressBar, Text } from "@tremor/react";

const MacrosProgress = () => (
  <Card className="flex w-full flex-col gap-2">
    {/* Energy */}
    <div>
      <Flex>
        <Text>Energy &bull; 2000.0 / 2500.0 kcal</Text>
        <Text>80%</Text>
      </Flex>
      <ProgressBar value={80} color="slate" className="mt-1" />
    </div>
    {/* Protein */}
    <div>
      <Flex>
        <Text>Protein &bull; 4.8 / 119.7 g</Text>
        <Text>4%</Text>
      </Flex>
      <ProgressBar value={4} color="lime" className="mt-1" />
    </div>
    {/* Carbs */}
    <div>
      <Flex>
        <Text>Carbs &bull; 69.2 / 215.4 g</Text>
        <Text>32%</Text>
      </Flex>
      <ProgressBar value={32} color="violet" className="mt-1" />
    </div>
    {/* Fat */}
    <div>
      <Flex>
        <Text>Fat &bull; 13.3 / 63.8 g</Text>
        <Text>21%</Text>
      </Flex>
      <ProgressBar value={21} color="amber" className="mt-1" />
    </div>
  </Card>
);

export { MacrosProgress };
