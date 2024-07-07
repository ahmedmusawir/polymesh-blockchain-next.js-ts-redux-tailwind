import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  instrumentType,
  securityIdentifierType,
  assignedFundingRound,
} from "./ConfigForm.config";
import ConfigPopup from "./ConfigPopup";

interface Props {
  status: string;
}

const ConfigForm = ({ status }: Props) => {
  const router = useRouter();
  const { ticker } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      assetType: instrumentType[0].name, // assuming instrumentType is an array of objects with a name property
      securityIdentifier: securityIdentifierType[0].name, // assuming securityIdentifierType is an array of objects
      fundingRound: assignedFundingRound[0].name, // assuming assignedFundingRound is an array of objects
      isDivisible: false, // Default value for divisibility
      // documents: { name: "The Moose", uri: "https://cyberize.com" },
    },
  });
  const divisibility = watch("isDivisible");

  const [details, setDetails] = useState(null);
  // Show the modal when form details are set
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data: any) => {
    setDetails({
      ...data,
      isDivisible: data.isDivisible === "1", // Convert string '1' to boolean true
    });
    setShowModal(true);
    console.log(data);
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-8 rounded-lg shadow"
      >
        <div className="text-2xl font-bold mb-4">Security token details</div>
        <div className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full">
          Status: {status}
        </div>

        <div className="mb-4">
          <label
            htmlFor="tickerSymbol"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Your ticker symbol
          </label>
          <div className="bg-gray-100 p-8 rounded">
            {/* Dynamic ticker symbol here */}
            <span className="text-3xl font-bold">{ticker}</span>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="securityTokenName"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Security token name
          </label>
          <input
            id="securityTokenName"
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter your token name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-2">
              Security token name is required.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="instrumentType"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Instrument type
          </label>
          <select
            id="instrumentType"
            {...register("assetType", { required: true })}
            className="select select-bordered w-full"
          >
            {instrumentType.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.assetType && (
            <p className="text-red-500 text-xs mt-2">
              Instrument type is required.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="securityIdentifier"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Security identifier (optional)
          </label>
          <select
            id="securityIdentifier"
            {...register("securityIdentifier")}
            className="select select-bordered w-full"
          >
            {securityIdentifierType.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="fundingRound"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Assigned funding round (optional)
          </label>
          <select
            id="fundingRound"
            {...register("fundingRound")}
            className="select select-bordered w-full"
          >
            {assignedFundingRound.map((round) => (
              <option key={round.name} value={round.name}>
                {round.name}
              </option>
            ))}
          </select>
        </div>

        {/* ... more inputs for token divisibility and references ... */}

        {/* <div className="flex flex-col items-start">
          <h4 className="font-medium text-lg mb-3">Token Divisibility</h4>
          <label className="inline-flex items-center space-x-2">
            <input
              type="radio"
              value="1"
              {...register("isDivisible", {
                setValueAs: (value) => value === "1",
              })}
              className="radio radio-primary"
            />
            <span className="label-text">Divisible</span>
          </label>

          <label className="inline-flex items-center space-x-2 mt-3">
            <input
              type="radio"
              value=""
              {...register("isDivisible", {
                setValueAs: (value) => value === "1",
              })}
              className="radio radio-primary"
            />
            <span className="label-text">Indivisible</span>
          </label>
        </div> */}

        {/* <div className="flex flex-col items-start">
          <h4 className="font-medium text-lg mb-3">Token Divisibility</h4>
          <label className="inline-flex items-center space-x-2">
            <input
              type="radio"
              value="1"
              {...register("isDivisible", {
                required: "Divisibility selection is required",
              })}
              className="radio radio-primary"
            />
            <span className="label-text">Divisible</span>
          </label>

          <label className="inline-flex items-center space-x-2 mt-3">
            <input
              type="radio"
              value="0"
              {...register("isDivisible", {
                required: "Divisibility selection is required",
              })}
              className="radio radio-primary"
            />
            <span className="label-text">Indivisible</span>
          </label>
          {errors.isDivisible && (
            <p className="text-red-500 text-xs mt-2">
              {errors.isDivisible.message}
            </p>
          )}
        </div> */}

        <button type="submit" className="btn btn-primary">
          Save token configuration
        </button>
      </form>
      {/* Modal for form confirmation */}
      {showModal && (
        <ConfigPopup details={details} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ConfigForm;
