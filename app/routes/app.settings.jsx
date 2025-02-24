import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Button,
  useBreakpoints,
  Divider
} from "@shopify/polaris";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import db from "../db.server"

export async function loader(state) {
  // Get data from database and provide data to the component
  // let settings = {
  //   name: 'my wishlist application',
  //   description: 'My wishlist application description',
  // }
  let settings = await db.settings.findFirst({ where: { id: '1' } });
  console.log('settings loader: ', settings);
  return json(settings)
}

export async function action({ request }) {
  // Update persistent data
  let settings = await request.formData();

  // Because settings is not an object, we need to convert it to object
  settings = Object.fromEntries(settings)

  // Update data from database
  // https://www.prisma.io/docs/orm/reference/prisma-client-reference
  await db.settings.upsert({
    where: {
      id: '1',
    },
    update: {
      id: '1',
      name: settings.name,
      description: settings.description
    },
    create: {
      id: '1',
      name: settings.name,
      description: settings.description
    },
  })

  return json(settings);
}

export default function SettingsPage() {
  const { smUp } = useBreakpoints();
  const settingData = useLoaderData();
  console.log('setting data: ', settingData)
  const [formState, setFormState] = useState(settingData);

  // This example is for guidance purposes. Copying it will come with caveats.
  return (
    <Page>
      <ui-title-bar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                {'Settings'}
              </Text>
              <Text as="p" variant="bodyMd">
                {'Update app settings and preference'}
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField label="App name" name='name' value={formState?.name} onChange={(value) => setFormState({ ...formState, name: value })} />
                <TextField label="Description" name='description' value={formState?.description} onChange={(value) => setFormState({ ...formState, description: value })} />
                <Button variant="primary" submit="true">{'Save'}</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
        {smUp ? <Divider /> : null}
        {/*<InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Dimensions
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <TextField label="Horizontal" />
              <TextField label="Interjamb ratio" />
            </BlockStack>
          </Card>
        </InlineGrid> */}
      </BlockStack>
    </Page>
  );
}
