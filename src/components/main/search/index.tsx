import React, { useState } from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { toUserProfile, getUser } from '../../../redux/actions'
import { AppState } from '../../../redux/types'
import { UserVars } from '../../signup/types'

export type SearchVar = {
  searchItem: string
}
const Search = () => {
  const dispatch = useDispatch()

  const users = useSelector((state: AppState) => state.signupReducer)

  const [invalid, setInvalid] = useState<boolean>(false)

  const initialValues: SearchVar = {
    searchItem: ''
  }

  const onSubmit = (values: SearchVar, { resetForm }: any) => {

    const toProfile = users.findIndex((val: UserVars) => val.username === values.searchItem)
    if (toProfile > -1) {
      dispatch(toUserProfile())
      dispatch(getUser(values.searchItem))
      setInvalid(false)
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