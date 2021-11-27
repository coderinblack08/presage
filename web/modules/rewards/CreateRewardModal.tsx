import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import * as yup from "yup";
import { InputField } from "../InputField";
import { useCreateRewardMutation } from "./useCreateRewardMutation";

interface CreateRewardModalProps {}

export const CreateRewardModal: React.FC<CreateRewardModalProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);
  const { mutateAsync } = useCreateRewardMutation();
  const firstFocus = useRef<any>(null);

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<Icon as={MdAdd} w={5} h={5} />}
        colorScheme="blue"
      >
        New Reward
      </Button>
      <Modal
        size="lg"
        initialFocusRef={firstFocus}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              type: "message",
              name: "",
              description: "",
              cost: 0,
              message: "",
              maxShoutouts: 10,
            }}
            validationSchema={yup.object().shape({
              type: yup.string().required(),
              name: yup.string().max(256).required(),
              description: yup.string().max(1024).required(),
              cost: yup.number().moreThan(-1).required(),
              message: yup.string().when("type", {
                is: "message",
                then: yup.string().max(8192).required(),
                otherwise: yup.string().notRequired(),
              }),
              maxShoutouts: yup.number().when("type", {
                is: "shoutout",
                then: yup.number().positive().required(),
                otherwise: yup.number().notRequired(),
              }),
            })}
            onSubmit={async (values) => {
              await mutateAsync(values);
            }}
          >
            {({ values, handleChange, setFieldValue, handleBlur }) => (
              <Form>
                <ModalHeader>Reward</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Tabs
                    onChange={(index) => setTabIndex(index)}
                    colorScheme="blue"
                  >
                    <TabList>
                      <Tab>Setup</Tab>
                      <Tab>Hidden</Tab>
                    </TabList>
                    <TabPanels mt={4}>
                      <TabPanel py={2} px={0}>
                        <VStack spacing={5} as={Form}>
                          <FormControl>
                            <FormLabel>Type</FormLabel>
                            <Select
                              name="type"
                              value={values.type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              ref={firstFocus}
                              placeholder="Select option"
                            >
                              <option value="form" disabled>
                                Form
                              </option>
                              <option value="message">Message</option>
                              <option value="shoutout">Shoutout</option>
                              <option value="free-article" disabled>
                                Free Article
                              </option>
                              <option value="free-subscription" disabled>
                                Free Subscription
                              </option>
                            </Select>
                          </FormControl>
                          <InputField
                            placeholder="Enter name..."
                            label="Name"
                            name="name"
                          />
                          <FormControl>
                            <FormLabel>Cost (points)</FormLabel>
                            <NumberInput
                              min={0}
                              name="cost"
                              value={values.cost}
                              onChange={(_, v) => setFieldValue("cost", v || 0)}
                            >
                              <NumberInputField placeholder="Enter points..." />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                          <InputField
                            placeholder="Enter description..."
                            label="Description"
                            name="description"
                            rows={6}
                            textarea
                          />
                        </VStack>
                      </TabPanel>
                      <TabPanel py={2} px={0}>
                        {values.type === "message" && (
                          <InputField
                            name="message"
                            label="Message"
                            placeholder="Enter message"
                            helperText="Only shown after reward is redeemed"
                            rows={6}
                            textarea
                          />
                        )}
                        {values.type === "shoutout" && (
                          <InputField
                            name="maxShoutouts"
                            label="Max Shoutouts"
                            placeholder="Enter max shoutouts..."
                            helperText="Max number of shoutouts per article"
                          />
                        )}
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={2}>
                    Create Reward
                  </Button>
                  <Button type="button" onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};
