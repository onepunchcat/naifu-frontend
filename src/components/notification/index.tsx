import React from 'react'

import { classNames } from '../../utils'
import { IconClose, IconNDanger, IconNInfo, IconNSuccess, IconNWarning } from '../icon'

type NotificationContainerProps = {
  className?: string
}

function NotificationContainer(props: React.PropsWithChildren<NotificationContainerProps>) {
  return (
    <div
      className={classNames(
        'relative flex flex-row items-center border-l-4 w-80 p-4 text-sm shadow-lg',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

type DismissButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> & {
  className?: string
}

function DismissButton(props: DismissButtonProps) {
  const { className, ...others } = props
  return (
    <button type="button" className={classNames('absolute right-0 top-0 w-4 m-3', className)} {...others}>
      <IconClose className="w-6" />
    </button>
  )
}

type IconContainerProps = {
  className?: string
}

function IconContainer(props: React.PropsWithChildren<IconContainerProps>) {
  return <div className={classNames('w-5 h-5 mr-2 flex-shrink-0', props.className)}>{props.children}</div>
}

type ContentContainerProps = {
  title?: string
  titleClass?: string
  message: string
  messageClass?: string
}

function ContentContainer(props: ContentContainerProps) {
  return (
    <div className="flex flex-col w-full break-all">
      {props.title && <h4 className={classNames('font-bold text-base', props.titleClass)}>{props.title}</h4>}
      <p className={props.messageClass}>{props.message}</p>
    </div>
  )
}

type NotificationProps = {
  title?: string
  message: string
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>
}

export function SuccessNotification(props: NotificationProps) {
  return (
    <NotificationContainer className="border-green-400 bg-green-50">
      <DismissButton type="button" className="text-green-400" onClick={props.onDismiss} />
      <IconContainer className="text-green-500">
        <IconNSuccess className="w-5" />
      </IconContainer>
      <ContentContainer title={props.title} titleClass="text-green-500" message={props.message} />
    </NotificationContainer>
  )
}

export function InfoNotification(props: NotificationProps) {
  return (
    <NotificationContainer className="border-blue-400 bg-blue-50">
      <DismissButton type="button" className="text-blue-400" onClick={props.onDismiss} />
      <IconContainer className="text-blue-500">
        <IconNInfo className="w-5" />
      </IconContainer>
      <ContentContainer title={props.title} titleClass="text-blue-500" message={props.message} />
    </NotificationContainer>
  )
}

export function WarningNotification(props: NotificationProps) {
  return (
    <NotificationContainer className="border-yellow-400 bg-yellow-50">
      <DismissButton type="button" className="text-yellow-400" onClick={props.onDismiss} />
      <IconContainer className="text-yellow-500">
        <IconNWarning className="w-5" />
      </IconContainer>
      <ContentContainer title={props.title} titleClass="text-yellow-500" message={props.message} />
    </NotificationContainer>
  )
}

export function DangerNotification(props: NotificationProps) {
  return (
    <NotificationContainer className="border-red-400 bg-red-50">
      <DismissButton type="button" className="text-red-400" onClick={props.onDismiss} />
      <IconContainer className="text-red-500">
        <IconNDanger className="w-5" />
      </IconContainer>
      <ContentContainer title={props.title} titleClass="text-red-500" message={props.message} />
    </NotificationContainer>
  )
}
