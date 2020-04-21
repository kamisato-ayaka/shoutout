import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../redux/actions'
import { Formik } from 'formik'
import { AppState } from '../../../redux/types'
import { UserVars } from '../../signup/types'

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
      history.push(`/${user}`)
      resetForm()

    } else if (toProfile === -1) {
      setInvalid(true)
      resetForm()
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {formik => (
          <>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="searchItem"
                  placeholder="Search..."
                  value={formik.values.searchItem}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.searchItem && formik.errors.searchItem ? (
                  <div>{formik.errors.searchItem}</div>
                ) : null}
              </div>
            </form>
          </>
        )}
      </Formik>
      {!invalid ? '' : <p className="message">No result(s) found</p>}
    </>
  )
}

export default Search