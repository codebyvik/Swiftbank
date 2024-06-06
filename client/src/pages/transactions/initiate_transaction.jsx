import { useEffect, useState } from "react";
import { Typography, Button, Box, Card } from "@mui/material";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import BeneficiarySection from "./__beneficiary_info";
import AmountSection from "./__amount_desc";
import ConfirmSection from "./__pin_confirm";
import AlertUser from "../../utils/show_alert";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBeneficiariesStart } from "../../redux/beneficiaries/beneficiaries.slice";
import { addTransactionStart } from "../../redux/transactions/transactions.slice";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../utils/__back_button";
import Title from "../../utils/Page_title";

const steps = ["Select Benficiary", "Enter Amount and description", "Confirm"];

function InitiateTransaction() {
  Title("Swiftbank | Send Money");
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currlocation = location.pathname;

  const { beneficiaries } = useSelector((state) => state.beneficiaries);

  // eslint-disable-next-line
  const [payload, setPayload] = useState({
    page: 1,
    sort: "DESC",
    name: "",
  });

  useEffect(() => {
    dispatch(fetchAllBeneficiariesStart(payload));
  }, [dispatch, payload]);

  const handleNext = () => {
    if (activeStep >= steps.length - 1) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [transactionDetails, setTransactionDetails] = useState({
    amount: "",
    beneficiary: {},
    description: "",
    transaction_PIN: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "beneficiary") {
      const filterBeneficiary = beneficiaries.filter((ben) => value === ben.account_number);

      return setTransactionDetails({ ...transactionDetails, beneficiary: filterBeneficiary[0] });
    }

    return setTransactionDetails({ ...transactionDetails, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission
    const checkData = verifiyData(transactionDetails);
    if (checkData) {
      const payload = {
        navigate,
        transactionDetails,
        currlocation,
      };
      return dispatch(addTransactionStart(payload));
    }
  };

  const verifiyData = (transactionData) => {
    if (Object.keys(transactionDetails.beneficiary).length <= 0) {
      AlertUser("Select Beneficiary", "error");
      return false;
    }
    if (!transactionDetails.amount) {
      AlertUser("Enter Amount", "error");
      return false;
    }
    if (!transactionDetails.transaction_PIN) {
      AlertUser("Enter transaction PIN", "error");
      return false;
    }

    return true;
  };

  return (
    <Box sx={{ width: { xs: "100%", md: "70%", lg: "50%" }, margin: "auto" }}>
      <BackButton location="/" />
      <Typography color="primary" variant="h4" my={2}>
        Send Money
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Stepper
          sx={{ display: { xs: "none", sm: "flex" } }}
          variant="success"
          activeStep={activeStep}
        >
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {/* render section based on steps */}

        <Card
          sx={{
            minHeight: "400px",
            boxShadow: 2,
            p: 3,
            mt: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {activeStep === 0 ? (
            <BeneficiarySection
              transactionDetails={transactionDetails}
              handleChange={handleChange}
              beneficiary={beneficiaries}
            />
          ) : activeStep === 1 ? (
            <AmountSection transactionDetails={transactionDetails} handleChange={handleChange} />
          ) : (
            <ConfirmSection transactionDetails={transactionDetails} handleChange={handleChange} />
          )}
        </Card>

        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Step {activeStep + 1}
            <Typography sx={{ display: { xs: "inline", sm: "none" } }} component="span">
              : {steps[activeStep]}{" "}
            </Typography>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2, justifyContent: "flex-end" }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={handleSubmit}>
                confirm and Send
              </Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </Box>
        </>
      </Box>
    </Box>
  );
}

export default InitiateTransaction;
