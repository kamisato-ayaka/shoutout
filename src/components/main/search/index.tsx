import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../redux/actions'
import { Formik } from 'formik'
import { AppState } from '../../../redux/types'
import { UserVars } from '../../signup/types'
import { SearchDiv, FormInvalid } from '../../styles';

export type SearchVar = {
  searchItem: string
}
const Search = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const users = useSelector((state: AppState) => state.signupReducer)

  const [invalid, setInvalid] = useState<boolean>(false)

  const initialValues: SearchVar = {
    searchItem: ''
  }

  const onSubmit = (values: SearchVar, { resetForm }: any) => {
    const toProfile = users.findIndex((val: UserVars) => val.username === values.searchItem)

    const user = values.searchItem
    if (toProfile > -1) {
      dispatch(getUser(user))
      setInvalid(false)
      resetForm()
      history.push(`/${user}`)

    } else if (toProfile === -1) {
      setInvalid(true)
      resetForm()
    }
  }

  return (
    <>
      <SearchDiv>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  className="search-field"
                  name="searchItem"
                  placeholder="Search..."
                  value={formik.values.searchItem}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
            </form>
          )}
        </Formik>
      </SearchDiv>
      <div>
        {!invalid ? '' : <FormInvalid>No result(s) found</FormInvalid>}
      </div>
    </>
  )
}

export default Search