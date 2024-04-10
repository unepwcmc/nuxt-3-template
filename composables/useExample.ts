// import { useState } from "#app";

function giveRandomNum () {
  return useState<number>('giveRandomNum', () => Math.random())
}
function giveRandomNumNoUseState (): number {
  return Math.random()
}
function staticValue (): string {
  return '12345678'
}
export default function () {
  return {
    giveRandomNum,
    giveRandomNumNoUseState,
    staticValue
  }
}
