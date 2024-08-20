import React from 'react'
import Select, { GroupBase, SingleValue, StylesConfig } from 'react-select'

const ReactSelectStyle: StylesConfig<{
  value: string;
  label: string;
}, false, GroupBase<{
  value: string;
  label: string;
}>> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    boxShadow: 'none',
    minHeight: '50px',
    maxWidth: '300px',
    minWidth: '160px',
    width: '100%',
    ":hover": {
      backgroundColor: 'hsl(var(--nextui-default-200) / var(--nextui-default-100-opacity, var(--tw-bg-opacity)))'
    },
    border: 'none',
    backgroundColor: 'hsl(var(--nextui-default-100) / var(--nextui-default-100-opacity, var(--tw-bg-opacity)))',
    borderRadius: 'var(--nextui-radius-medium)'
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: 'hsl(var(--nextui-foreground-500) / var(--nextui-foreground-500-opacity, var(--tw-text-opacity)))'
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    display: 'none'
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: 'hsl(var(--nextui-content1) / var(--nextui-content1-opacity, var(--tw-bg-opacity)))',
    borderRadius: 'var(--nextui-radius-medium)',
    padding: '4px',
    zIndex: 1000,
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    zIndex: 1000,
  }),
  menuPortal: (baseStyles) => ({
    ...baseStyles,
    zIndex: 1000
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.375rem',
    paddingBottom: '0.375rem',
    borderRadius: 'var(--nextui-radius-medium)',
    backgroundColor: state.isFocused ? 'hsl(var(--nextui-default-200) / var(--nextui-default-100-opacity, var(--tw-bg-opacity)))' : 'hsl(var(--nextui-content1) / var(--nextui-content1-opacity, var(--tw-bg-opacity)))',
    ":hover": {
      backgroundColor: 'hsl(var(--nextui-default-200) / var(--nextui-default-100-opacity, var(--tw-bg-opacity)))'
    }
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: 'hsl(var(--nextui-default-foreground) / var(--nextui-default-foreground-opacity, var(--tw-text-opacity)))'
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: 'hsl(var(--nextui-default-foreground) / var(--nextui-default-foreground-opacity, var(--tw-text-opacity)))'
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: 'hsl(var(--nextui-content1) / var(--nextui-content1-opacity, var(--tw-bg-opacity)))',
    borderRadius: 'var(--nextui-radius-medium)',
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color: 'hsl(var(--nextui-default-foreground) / var(--nextui-default-foreground-opacity, var(--tw-text-opacity)))'
  }),
  'dropdownIndicator': (baseStyles) => ({
    ...baseStyles,
    ':hover': {
      color: 'inherit'
    }
  }),
}

type SearchableSelectProps = {
  label: string
  options: { value: string, label: string }[]
  defaultValue?: { value: string, label: string }[]
  placeholder?: string
  onChange?: (value: string | undefined) => void
  value?: { value: string, label: string }[]
}

const SearchableSelect:React.FC<SearchableSelectProps> = ({
  label,
  options,
  defaultValue,
  placeholder,
  onChange,
  value
}: SearchableSelectProps) => {


  const handleChange = (
    value: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    if(!onChange) return;

    if(Array.isArray(value)) {
      const values = value.map((v) => v.value) as string[]
      onChange(values.join(','))
    } else {
      onChange(value?.value)
    }
  }

  console.log(defaultValue)

  return (
    <div>
      <Select
        menuPosition='fixed'
        menuPlacement="auto"
        placeholder={placeholder}
        defaultValue={defaultValue}
        isMulti={true as any}
        isSearchable
        name={label}
        styles={ReactSelectStyle}  
        options={options} 
        onChange={handleChange}
        value={value}
      />
    </div>
  )

};

export default SearchableSelect