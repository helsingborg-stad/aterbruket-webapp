import React, { FC, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Loader from "react-loader-spinner";
import Form from "./Form";
import useForm from "../hooks/useForm";
import { updateAdvert } from "../graphql/mutations";
import { fieldsEditForm as fields } from "../utils/formUtils";
import UserContext from "../contexts/UserContext";

interface IareaOfUse {
  indoors: boolean;
  outside: boolean;
}

interface Imaterial {
  metal: boolean;
  plastic: boolean;
  other: boolean;
  wood: boolean;
}

interface Props {
  item: {
    id: number;
    title: string;
    aterbruketId: string;
    status: string;
    category?: string;
    quantity?: number;
    height?: number;
    width?: number;
    length?: number;
    color?: string;
    material?: Imaterial | any;
    condition?: string;
    areaOfUse?: IareaOfUse | any;
    description?: string;
    department?: string;
    location?: string;
    contactPerson?: string;
    giver: string;

    email?: string;
    phoneNumber?: number;
    climateImpact: number;
    version: number;
    revisions: number;
    company?: string;
    purchasePrice: number;
  };
  setRegive: React.Dispatch<React.SetStateAction<boolean>>;
  closeEditformAndFetchItem: () => void;
}

const RegiveForm: FC<Props> = ({
  setRegive,
  item,
  closeEditformAndFetchItem,
}: Props) => {
  const { user } = useContext(UserContext);

  const {
    values,
    handleInputChange,
    handleSubmit,
    handleCheckboxChange,
    redirect,
    result,
    file,
    fileUploading,
  } = useForm(
    {
      id: item.id,
      title: item.title,
      aterbruketId: item.aterbruketId ? item.aterbruketId : "",
      status: "available",
      category: item.category,
      quantity: item.quantity,
      height: item.height,
      width: item.width,
      length: item.length,
      color: item.color,
      material: {
        metal: item.material[0].metal,
        plastic: item.material[0].plastic,
        other: item.material[0].other,
        wood: item.material[0].wood,
      },
      condition: item.condition,
      areaOfUse: {
        indoors: item.areaOfUse[0].indoors,
        outside: item.areaOfUse[0].outside,
      },
      description: item.description,
      company: user.company ? user.company : "",
      department: user.department ? user.department : "",
      location: user.address ? user.address : "",
      contactPerson: user.name ? user.name : "",
      email: user.email ? user.email : "",
      phoneNumber: item.phoneNumber ? item.phoneNumber : "",
      climateImpact: item.climateImpact,
      version: 0,
      revisions: item.revisions + 1,
      purchasePrice: item.purchasePrice ? item.purchasePrice : "",
      giver: user.sub,
    },
    updateAdvert
  );

  if (redirect && !fileUploading) {
    closeEditformAndFetchItem();
  }
  return (
    <>
      {fileUploading && (
        <Loader type="ThreeDots" color="#9db0c6" height={200} width={200} />
      )}

      {!fileUploading && (
        <>
          <button type="button" onClick={() => setRegive(false)}>
            X
          </button>
          <Form
            values={values}
            fields={fields}
            mutation={updateAdvert}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleCheckboxChange={handleCheckboxChange}
          />
        </>
      )}
    </>
  );
};

export default RegiveForm;
