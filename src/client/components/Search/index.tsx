import * as React from "react";
import { Formik, FormikProps } from "formik";
import { isEmpty } from "validator";
import { InputBase, IconButton } from "@material-ui/core";
import { Search as SearchIcon, Clear as ClearIcon } from "@material-ui/icons";
import { StringsContext } from "src/client/strings/index";
import styled from "src/client/theme/index";
import { rgba } from "polished";
import { ErrorBar } from "./components/ErrorBar/index";

const Container = styled.div`
  margin: 10px;
`;

const StyledInputBase: any = styled(InputBase)`
  width: calc(100% - 48px);
`;

const InputContainer: any = styled.div`
  display: flex;
  padding: 5px 10px 5px 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  border-radius: 2px;
  box-shadow: 0 1px 2px 0
    ${({ theme }) =>
      theme &&
      `${rgba(theme.colors.gray5, 0.3)}, 0 2px 6px 2px ${rgba(
        theme.colors.gray5,
        0.15
      )}`};
`;

interface IProps {
  onSearch: (value: string) => void;
  onReset: () => void;
}

interface IValues {
  search: string;
}

export class Search extends React.PureComponent<IProps> {
  public render() {
    return (
      <Formik<IValues>
        initialValues={{
          search: ""
        }}
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
        validate={this.validate}
        render={this.renderForm}
      />
    );
  }

  private renderForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
    handleReset
  }: FormikProps<IValues>) => {
    return (
      <StringsContext.Consumer>
        {({
          strings: {
            components: { search }
          }
        }) =>
          search && (
            <>
              <Container>
                <form onSubmit={handleSubmit}>
                  <InputContainer>
                    <StyledInputBase
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      fullWidth={true}
                      placeholder={search.placeholder}
                      autoComplete="off"
                      id="search"
                      error={errors.search && touched.search}
                      className=""
                      value={values.search}
                    />
                    <IconButton
                      onClick={
                        !isEmpty(values.search)
                          ? handleReset
                          : handleSubmit.bind(values)
                      }
                    >
                      <>
                        {!isEmpty(values.search) ? (
                          <ClearIcon width={48} height={48} />
                        ) : (
                          <SearchIcon width={48} height={48} />
                        )}
                      </>
                    </IconButton>
                  </InputContainer>
                </form>
              </Container>
              {errors.search &&
                touched.search && (
                  <ErrorBar>{search.errors[errors.search]}</ErrorBar>
                )}
            </>
          )
        }
      </StringsContext.Consumer>
    );
  };

  private handleSubmit = (values: IValues) => {
    this.props.onSearch(values.search);
  };

  private handleReset = () => {
    this.props.onReset();
  };

  private validate = (values: IValues) => {
    const { search } = values;
    const errors: {
      search?: string;
    } = {};

    if (isEmpty(search)) {
      errors.search = "empty";
    }

    if (search.length < 2 && !isEmpty(search)) {
      errors.search = "tooShort";
    }

    return errors;
  };
}
