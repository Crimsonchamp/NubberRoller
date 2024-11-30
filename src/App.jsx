import { useState } from 'react'
import {
  AppShell, Burger, MantineProvider, Group, Button, Flex, Stack, SimpleGrid, Box,
  Image, NumberInput, CopyButton, ActionIcon, Tooltip, rem,
  createTheme, virtualColor, Text,
} from '@mantine/core'
import { Notifications, notifications, } from '@mantine/notifications'
import { useDisclosure } from '@mantine/hooks';
import { IconCopy, IconCheck } from '@tabler/icons-react'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Light } from 'c:/Users/16136/Desktop/Coding Folder/nuberproject/nuberproject/Components/light.jsx'
import React from 'react';

//Basic wrap for what is essentially main of the app
export default function App() {

  //Attempt at setting colors, not currently used, also a font that is applied
  const theme = createTheme({
    colors: {
      primary: virtualColor({
        name: 'primary',
        dark: 'red',
        light: 'green',
      })
    },
    fontFamily: 'fantasy',
    fontFamilyMonospace: 'Lucida Console, Courier, monospace',
    headings: { fontFamily: 'Greycliff CF, sans-serif' },
  });


  //Default Toggle state for burgers
  const [opened, { toggle }] = useDisclosure();

  //Custom Toggle state for notifications
  const [noted, setNotification] = useState(true)


  // State to hold the dice result, we set useState to an empty array, to hold results
  // Dice result holds current value, setDice result updates diceResult
  // Likewise for dicenumber, but only looking for a number input
  const [diceNumber, setDiceNumber] = useState(1)
  const [diceResult, setDiceResult] = useState([]);


  // Dice-Roll logic set to results.
  // When you click a dice, diceType is set into the rollDice function
  // Simplified because we swapped to number only entryfield 
  const rollDice = (diceType) => {
    const numDice = diceNumber

    //We establish an array for multi-rolling, followed by a basic for loop
    //Each roll is the dicetype * the math.random method, leading to 0-dice.99. 
    //We floor the number because we don't roll decimals, and then add 1 because we roll of 1, not 0
    //Each roll is then pushed into the rolls array
    const rolls = [];
    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      rolls.push(roll)
    }
    //On full roll, check note toggle, then note or not
    if (noted) {
      notifications.show({
        title: '🎲 Last Roll: ' + numDice + "D" + diceType,
        message: rolls.join(', ')
      })
    }
    //The prior roll gets rolled into a new copy of the array, adding the latest.
    //We set the type of the result to dicetype, used as result.type and result.rolls later
    setDiceResult((previousRoll) => [...previousRoll, { diceType, rolls }],);
    // Update state with the new dice roll
  };


  // Simple log clear, tied to reset button
  const resetDiceLog = () => {
    setDiceResult([])
  };


  return (
    //Default provider scheme, with font theme
    //Static height for header.
    //Footer gets taller to take in buttons in mobile mode
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      {/* Settings for Appshell view scaling */}
      <AppShell
        header={{ height: 70 }}
        footer={{ height: { xs: 200, sm: 250, md: 70, lg: 70 } }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
        aside={{ width: { sm: 500, md: 500, lg: 500 } }}
        padding="20"
      >
        {/*Notification set shows at top when larger than small, otherwise to bottom right, only 2 at a*/}
        <Notifications visibleFrom='sm' position='bottom-right' limit='2' />
        <Notifications hiddenFrom='sm' position='top-center' limit='2' />

        {/*Header split in two sides, nub and title on one, note and light on the other*/}
        <AppShell.Header >
          <Group h="100%" px="md" justify='space-between'>
            <Group h="100%" px="md" justify='center'>
              {/*Settings toggle when < small*/}
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Image
                h="xl"
                w="xl"
                src="https://nubbernaut.com/wp-content/uploads/2020/12/cropped-nubbe_logo_transparent_bg.png"
              />
              <Text size="xl" fw={700}>
                NubberRoller
              </Text>
            </Group>
            <Group h="100%" px="md" visibleFrom='sm' justify='flex-end'>
              {/*Custom Notification Toggle*/}
              {noted ?
                (<Button onClick={() => setNotification(noted === true ? false : true)}>
                  Notifications On
                </Button>) :
                (<Button onClick={() => setNotification(noted === true ? false : true)}>
                  Notifications Off
                </Button>)
              }
              {/*Default Light/Dark toggle*/}
              <Light />

            </Group>
          </Group>
        </AppShell.Header>

        {/*Navbar used for mobile settings, opens by burger in header in small*/}
        <AppShell.Navbar p="sm" hiddenFrom="sm"  >
          <Stack >
            <Stack>
              {/*Custom Notification Toggle*/}
              {noted ?
                (<Button onClick={() => setNotification(noted === true ? false : true)}>
                  Notifications On
                </Button>) :
                (<Button onClick={() => setNotification(noted === true ? false : true)}>
                  Notifications Off
                </Button>)
              }
            </Stack>
            <Stack align='center'>
              {/*Default Light/Dark toggle*/}
              <Light />
            </Stack>
          </Stack>
        </AppShell.Navbar>

        {/* Result box */}
        <AppShell.Main pt='80' pb='260'>
          {/* map out diceResult to print out the length of each roll, it's dice type, followed by it's results*/}
          <Stack fz='xl'>
            You rolled:
            {diceResult.map((result, index) => (
              <Flex key={index} fz='xl' >
                {result.rolls.length} D{result.diceType}: {result.rolls.join(', ')}

                {/*Adds a default copy button at the end of each result*/}
                <CopyButton value={result.rolls.length + "D" + result.diceType + ":  " + result.rolls.join(', ')}
                  timeout={1000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                      <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                        {copied ? (
                          <IconCheck style={{ width: rem(16) }} />
                        ) : (
                          <IconCopy style={{ width: rem(16) }} />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>

              </Flex>
            ))}
          </Stack>
        </AppShell.Main>

        {/*Dicebar for pc/wide layout, visible from tablet but not mobile* */}
        <AppShell.Aside p="20" visibleFrom="sm" >

          <Box >
            <Stack justify='center'>
              {/*Number only input, 1-99, hooks to dice functions*/}
              <NumberInput
                size="sm"
                placeholder="Set between 1-99"
                min={1}
                max={99}
                allowDecimal={false}
                value={diceNumber}
                onChange={setDiceNumber}
              />
              {/*Nice simple grid for the buttons*/}
              <SimpleGrid cols={3}>

                <Button
                  onClick={() => rollDice(2)}
                >D2
                </Button>

                <Button
                  onClick={() => rollDice(3)}
                >D3
                </Button>

                <Button
                  onClick={() => rollDice(4)}
                >D4
                </Button>

                <Button
                  onClick={() => rollDice(6)}
                >D6
                </Button>

                <Button
                  onClick={() => rollDice(8)}
                >D8
                </Button>

                <Button
                  onClick={() => rollDice(10)}
                >D10
                </Button>

                <Button
                  onClick={() => rollDice(12)}
                >D12
                </Button>

                <Button
                  onClick={() => rollDice(20)}
                >D20
                </Button>

                <Button
                  onClick={() => rollDice(100)}
                >D100
                </Button>

              </SimpleGrid>
              {/*Simple click logic for the resetDiceLog button */}

              <Button
                onClick={resetDiceLog}
              >Reset
              </Button>
            </Stack>

          </Box>

        </AppShell.Aside>

        {/*Footer button bar */}
        <AppShell.Footer p="sm" hiddenFrom="sm"  >

          <Stack >
            {/*Number only input, 1-99, hooks to dice functions*/}
            <NumberInput
              size="xs"
              placeholder="Set between 1-99"
              min={1}
              max={99}
              allowDecimal={false}
              value={diceNumber}
              onChange={setDiceNumber}
            />
            <SimpleGrid cols={3}>
              <Button size="sm"
                onClick={() => rollDice(2)}
              >D2
              </Button>

              <Button size="sm"
                onClick={() => rollDice(3)}
              >D3
              </Button>

              <Button size="sm"
                onClick={() => rollDice(4)}
              >D4
              </Button>

              <Button size="sm"
                onClick={() => rollDice(6)}
              >D6
              </Button>

              <Button size="sm"
                onClick={() => rollDice(8)}
              >D8
              </Button>

              <Button size="sm"
                onClick={() => rollDice(10)}
              >D10
              </Button>

              <Button size="sm"
                onClick={() => rollDice(12)}
              >D12
              </Button>

              <Button size="sm"
                onClick={() => rollDice(20)}
              >D20
              </Button>

              <Button size="sm"
                onClick={() => rollDice(100)}
              >D100
              </Button>


            </SimpleGrid>
            {/*Simple click logic for the resetDiceLog button */}
            <Button size="sm"
              onClick={resetDiceLog}
            >Reset
            </Button>

          </Stack>

        </AppShell.Footer>

      </AppShell >
    </MantineProvider >
  );
};


