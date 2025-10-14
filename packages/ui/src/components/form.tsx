'use client'
import type * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { Button } from '@ristokit/ui/components/button'
import { Input } from '@ristokit/ui/components/input'
import { Label } from '@ristokit/ui/components/label'
import { CloseIcon } from '@ristokit/ui/icons/close.icon'
import { EyeOffIcon } from '@ristokit/ui/icons/eye-off.icon'
import { EyeIcon } from '@ristokit/ui/icons/eye.icon'
import { cn } from '@ristokit/ui/lib/utils'
import * as React from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useFormState
} from 'react-hook-form'

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot='form-item' className={cn('grid gap-y-2.5', className)} {...props} />
    </FormItemContext.Provider>
  )
}

function FormGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='form-group' className={cn('relative grid overflow-hidden', className)} {...props} />
}

function FormLabel({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { variant?: 'field' }) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot='form-label'
      data-error={!!error}
      className={cn(
        'text-body-mobile-4 text-gray-dark transition-all duration-300 data-[error=true]:text-error',
        variant === 'field' &&
          'pointer-events-none absolute top-2.5 left-5 truncate bg-gray-light peer-placeholder-shown:top-[1.125rem] peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-body-mobile-2 peer-data-[placeholder=""]:top-[1.125rem] peer-data-[placeholder=""]:bg-transparent peer-data-[placeholder=""]:text-body-mobile-2',
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot='form-control'
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot='form-description'
      id={formDescriptionId}
      className={cn('text-body-mobile-4 text-gray-dark', className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? '') : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot='form-message'
      id={formMessageId}
      className={cn('flex items-center gap-x-1 text-body-mobile-4 text-error', className)}
      {...props}
    >
      <CloseIcon className='shrink-0 rounded-full bg-error stroke-background' /> {body}
    </p>
  )
}

function FormPasswordField({ className, ...props }: React.ComponentProps<typeof Input>) {
  const [isShowPassword, setIsShowPassword] = React.useState(false)
  const togglePasswordVisibility = () => setIsShowPassword((state) => !state)

  return (
    <FormGroup>
      <FormControl>
        <Input
          placeholder=''
          type={isShowPassword ? 'text' : 'password'}
          variant='field'
          className={cn('pr-[3.375rem]', className)}
          {...props}
        />
      </FormControl>
      <FormLabel variant='field'>Contraseña*</FormLabel>
      <Button
        onClick={togglePasswordVisibility}
        className='-translate-y-1/2 absolute top-1/2 right-5 size-6'
        variant='styless'
        size='styless'
        type='button'
      >
        {isShowPassword ? <EyeOffIcon className='stroke-gray-dark' /> : <EyeIcon className='stroke-gray-dark' />}
      </Button>
    </FormGroup>
  )
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormGroup,
  FormItem,
  FormLabel,
  FormMessage,
  FormPasswordField,
  useFormField
}
