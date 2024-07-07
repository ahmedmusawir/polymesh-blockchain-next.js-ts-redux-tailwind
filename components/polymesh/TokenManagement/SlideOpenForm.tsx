import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { instrumentType, assignedFundingRound } from "./SlideOpenForm.config";
import React from "react";
import { useForm } from "react-hook-form";
import {
  useEditTokenMutation,
  useGetAssetDetailsQuery,
} from "@/features/polymesh/apiPolymesh";
import Spinner from "@/components/ui-ux/Spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface FormData {
  name: string;
  assetType: string;
  fundingRound: string;
}

interface SlideOpenFormProps extends FormData {
  ticker: string;
}

const SlideOpenForm = ({
  name,
  assetType,
  fundingRound,
  ticker,
}: SlideOpenFormProps) => {
  const { openTokenEditForm, setOpenTokenEditForm } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: name,
      assetType: assetType,
      fundingRound: fundingRound,
    },
  });

  // RTK Mutation for Token Edit
  const [editToken, { isLoading, isSuccess, isError, error }] =
    useEditTokenMutation();

  // Update form defaults when props change
  useEffect(() => {
    reset({
      name: name,
      assetType: assetType,
      fundingRound: fundingRound,
    });
  }, [name, assetType, fundingRound, reset]);

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading(
      "Please wait, while the token details are being updated...",
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        style: { background: "dodgerblue", color: "#fff" }, // Default style for loading
      }
    );

    // Close the edit form modal right after launching the toast
    setOpenTokenEditForm(false);

    try {
      // Invoke the mutation with the form data and the ticker
      const result = await editToken({ ticker, ...data }).unwrap();

      // Log the edit results for debugging
      console.log("Edit Mutation Results", result);

      // Update toast with success message
      toast.update(toastId, {
        render: `Token details updated successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
        style: { background: "green", color: "#fff" }, // Success style
      });

      // Optionally, redirect the user or perform further actions
      console.log("Success - Token details have been updated.");
      // router.push(`/token/${ticker}/dashboard`); // Example of redirection
      window.location.reload();
    } catch (error) {
      console.error("Failed to update token details:", error);

      // Update toast with error message
      toast.update(toastId, {
        render: "Failed to update token details. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        style: { background: "red", color: "#fff" }, // Error style
      });

      // Optionally, handle the error differently, such as re-opening the edit form
      setOpenTokenEditForm(true);
      // router.push(`/edit-token/${ticker}/edit-failed`);  // Example of handling failure
    }
  };

  if (isError) return <div>Error loading details: {error?.toString()}</div>;

  return (
    <Transition.Root show={openTokenEditForm} as={Fragment}>
      <Dialog className="relative z-10" onClose={setOpenTokenEditForm}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-green-700">
                            Raze Token Launchpad
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              onClick={() => setOpenTokenEditForm(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="container mx-auto p-4 bg-white shadow-md rounded-lg"
                        >
                          <h2 className="text-2xl font-bold mb-10">
                            Edit Security Token
                          </h2>

                          <div className="mb-10">
                            <label
                              htmlFor="name"
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Security Token Name
                            </label>
                            <input
                              id="name"
                              type="text"
                              {...register("name", {
                                required: "Security token name is required",
                              })}
                              className="input input-bordered w-full"
                            />
                            {errors.name && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.name.message}
                              </p>
                            )}
                          </div>

                          <div className="mb-10">
                            <label
                              htmlFor="assetType"
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Instrument Type
                            </label>
                            <select
                              id="assetType"
                              {...register("assetType", {
                                required: "Instrument type is required",
                              })}
                              className="select select-bordered w-full"
                            >
                              {instrumentType.map((type, index) => (
                                <option key={index} value={type.name}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                            {errors.assetType && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.assetType.message}
                              </p>
                            )}
                          </div>

                          <div className="mb-10">
                            <label
                              htmlFor="fundingRound"
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Assigned Funding Round
                            </label>
                            <select
                              id="fundingRound"
                              {...register("fundingRound", {
                                required: "Assigned funding round is required",
                              })}
                              className="select select-bordered w-full"
                            >
                              {assignedFundingRound.map((round, index) => (
                                <option key={index} value={round.name}>
                                  {round.name}
                                </option>
                              ))}
                            </select>
                            {errors.fundingRound && (
                              <p className="text-red-500 text-xs mt-2">
                                {errors.fundingRound.message}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-shrink-0 justify-end px-4 py-4 mt-20">
                            <button
                              type="button"
                              className="rounded-md bg-white px-10 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                              onClick={() => setOpenTokenEditForm(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="ml-4 inline-flex justify-center rounded-md bg-green-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                        onClick={() => setOpenTokenEditForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        Save
                      </button>
                    </div> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOpenForm;
