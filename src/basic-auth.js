;(async () => {
  {
    const response = await fetch('http://localhost:7080', {
      headers: {
        Authorization: `Basic ${Buffer.from('admin:secret').toString('base64')}`
      }
    })

    console.group('Success basic auth')
    console.log('Status:', response.status)
    console.log('Response:', await response.text())
    console.groupEnd()
  }

  {
    const response = await fetch('http://localhost:7080', {
      headers: {
        Authorization: `Basic ${Buffer.from('admin:wrongpassword').toString('base64')}`
      }
    })

    console.group('Failed basic auth')
    console.log('Status:', response.status)
    console.log('Response:', await response.text())
    console.groupEnd()
  }
})()
