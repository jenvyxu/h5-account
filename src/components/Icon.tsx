import React from 'react';
import cs from 'classnames'
// require 一个文件夹
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}

type Props = {
  name?: string
} & React.SVGAttributes<SVGElement>

const Icon = (props: Props) => {
  const { name, className, children, ...rest} = props
  return (
      <svg className={cs('icon', className)} {...rest}>
        { name && <use xlinkHref={'#' + name } />}
      </svg>
  )
}

export default Icon